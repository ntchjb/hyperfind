import PropTypes from 'prop-types';

export const decorateTerm = (Term, { React }) => class extends React.Component {
  static propTypes = {
    onDecorated: PropTypes.func,
  };

  static defaultProps = {
    onDecorated: undefined,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      focused: false,
    };
    this.hyperFindInput = null;
    this.onDecorated = this.onDecorated.bind(this);
    this.handleFindNext = this.handleFindNext.bind(this);
    this.handleFindPrev = this.handleFindPrev.bind(this);
    this.handleToggleInput = this.handleToggleInput.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
  }

  componentDidMount() {
    window.rpc.on('hyperfind:find', this.handleToggleInput);
    window.rpc.on('hyperfind:findnext', this.handleFindNext);
    window.rpc.on('hyperfind:findprev', this.handleFindPrev);
  }

  componentWillUnmount() {
    window.rpc.removeListener('hyperfind:find', this.handleToggleInput);
    window.rpc.removeListener('hyperfind:findnext', this.handleFindNext);
    window.rpc.removeListener('hyperfind:findprev', this.handleFindPrev);
  }

  onDecorated(term) {
    this.term = term;
    this.term.handleSelectAll = this.handleSelectAll;
    const { onDecorated } = this.props;
    if (onDecorated) onDecorated(term);
  }

  handleSelectAll = () => {
    const { focused } = this.state;
    if (focused === true) {
      this.hyperFindInput.select();
    } else {
      this.term.selectAll();
    }
  }

  handleOnFocus = (event) => {
    event.target.select();
    this.setState({ focused: true });
  }

  handleOnBlur = (event) => {
    this.setState({ focused: false });
  }

  handleOnKeyDown = (event) => {
    /* If press enter, then search next */
    const { uid, focussedSessionUid } = this.props;
    if (uid === focussedSessionUid) {
      if (event.key === 'Enter' && event.shiftKey) {
        this.handleFindPrev();
      } else if (event.key === 'Enter') {
        this.handleFindNext();
      } else if (event.key === 'Escape') {
        /* Hide finding dialog */
        const { term } = this.props;
        if (term) term.focus();
      }
    }
  }

  handleOnChange = (event) => {
    /* If text changed, reset search and search next again */
    const { uid, focussedSessionUid } = this.props;
    if (uid === focussedSessionUid) {
      /* Reset finding */
      /* Start finding */
    }
  }

  handleToggleInput = () => {
    /* Display/Hide find dialog */
    this.hyperFindInput.focus();
    console.log('Hyperfind dialog toggled');
  }

  handleFindNext = () => {
    /* Do find next operation */
    console.log('find next');
  }

  handleFindPrev = () => {
    /* Do find previous operation */
    console.log('find previous');
  }

  render() {
    return (
      <React.Fragment>
        <div className="hyperfind-wrapper">
          <div className="hyperfind-box invert">
            <input ref={(input) => { this.hyperFindInput = input; }} id="hyperfind-input" className="invert" placeholder="Find" onFocus={this.handleOnFocus} onBlur={this.handleOnBlur} onKeyDown={this.handleOnKeyDown} onChange={this.handleOnChange} />
            <button className="hyperfind-btn invert" type="button" onClick={this.handleFindPrev}>❮</button>
            <button className="hyperfind-btn invert" type="button" onClick={this.handleFindNext}>❯</button>
          </div>
        </div>
        <Term {...this.props} onDecorated={this.onDecorated} />
      </React.Fragment>
    );
  }
};

export const mapTermsState = (state, map) => (
  Object.assign(map, {
    focussedSessionUid: state.sessions.activeUid,
    hyperFindToggleInput: state.ui.hyperFindToggleInput,
    hyperFindInputText: state.ui.hyperFindInputText,
    hyperFindLastUserFind: state.ui.hyperFindLastUserFind,
    hyperFindCurrentRow: state.ui.hyperFindCurrentRow,
  })
);

export const passProps = (uid, parentProps, props) => (
  Object.assign(props, {
    focussedSessionUid: parentProps.focussedSessionUid,
    hyperFindToggleInput: parentProps.hyperFindToggleInput,
    hyperFindInputText: parentProps.hyperFindInputText,
    hyperFindLastUserFind: parentProps.hyperFindLastUserFind,
    hyperFindCurrentRow: parentProps.hyperFindCurrentRow,
  })
);

export const getTermGroupProps = passProps;
export const getTermProps = passProps;
