import PropTypes from 'prop-types';
import * as Search from './lib/search/search';
import { setSessionUidAtInput, setActiveSession } from './actions';

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
      inputValue: '',
      hidden: false,
    };
    this.hyperFindInput = null;
    this.onDecorated = this.onDecorated.bind(this);
    this.handleFindNext = this.handleFindNext.bind(this);
    this.handleFindPrev = this.handleFindPrev.bind(this);
    this.handleShowInput = this.handleShowInput.bind(this);
    this.handleHideInput = this.handleHideInput.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
  }

  componentDidMount() {
    window.rpc.on('hyperfind:find', this.handleShowInput);
    window.rpc.on('hyperfind:hidefind', this.handleHideInput);
    window.rpc.on('hyperfind:findnext', this.handleFindNext);
    window.rpc.on('hyperfind:findprev', this.handleFindPrev);
  }

  componentWillUnmount() {
    window.rpc.removeListener('hyperfind:find', this.handleShowInput);
    window.rpc.removeListener('hyperfind:hidefind', this.handleHideInput);
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
    const { uid } = this.props;
    /* global store */
    store.dispatch(setSessionUidAtInput(uid));
    event.target.select();
    this.setState({ focused: true });
  }

  handleOnBlur = () => {
    this.setState({ focused: false });
  }

  checkFocusToTerm = (uid, focussedSessionUid) => {
    if (uid !== focussedSessionUid) {
      /* global store */
      store.dispatch(setActiveSession(uid));
    }
  }

  handleOnKeyDown = (event) => {
    /* If press enter, then search next */
    const { uid, focussedSessionUid } = this.props;
    if (event.key === 'Enter' && event.shiftKey) {
      this.handleFindPrev();
      event.target.select();
    } else if (event.key === 'Enter') {
      this.handleFindNext();
      event.target.select();
    } else if (event.key === 'Escape') {
      this.checkFocusToTerm(uid, focussedSessionUid);
      /* Hide finding dialog */
      this.setState({
        hidden: false,
      });
      const { term } = this.props;
      if (term) term.focus();
    }
  }

  handleOnChange = (event) => {
    /* If text changed, reset search and search next again */
    const { uid, focussedSessionUid } = this.props;
    if (uid === focussedSessionUid) {
      this.setState({
        inputValue: event.target.value,
      });
    }
  }

  handleShowInput = () => {
    /* Display/Hide find dialog */
    const { uid, focussedSessionUid } = this.props;
    if (uid === focussedSessionUid) {
      this.setState({
        hidden: true,
      });
      this.hyperFindInput.focus();
    }
  }

  handleHideInput = () => {
    /* Display/Hide find dialog */
    const { uid, focussedSessionUid } = this.props;
    if (uid === focussedSessionUid) {
      this.setState({
        hidden: false,
      });
    }
  }

  handleFindNext = () => {
    const { inputValue } = this.state;
    if (inputValue.length > 0) {
      /* Do find next operation */
      Search.findNext(this.term.term, inputValue);
    }
  }

  handleFindPrev = () => {
    const { inputValue } = this.state;
    if (inputValue.length > 0) {
      /* Do find previous operation */
      Search.findPrevious(this.term.term, inputValue);
    }
  }

  render() {
    const { inputValue, hidden } = this.state;
    return (
      <React.Fragment>
        { hidden
          ? (
            <div className="hyperfind-wrapper">
              <div className="hyperfind-box invert">
                <input ref={(input) => { this.hyperFindInput = input; }} value={inputValue} id="hyperfind-input" className="invert" placeholder="Find" onFocus={this.handleOnFocus} onBlur={this.handleOnBlur} onKeyDown={this.handleOnKeyDown} onChange={this.handleOnChange} />
                <button className="hyperfind-btn invert" type="button" onClick={this.handleFindPrev}>❮</button>
                <button className="hyperfind-btn invert" type="button" onClick={this.handleFindNext}>❯</button>
              </div>
            </div>
          ) : null }
        <Term {...this.props} onDecorated={this.onDecorated} />
      </React.Fragment>
    );
  }
};

export const mapTermsState = (state, map) => (
  Object.assign(map, {
    focussedSessionUid: state.sessions.activeUid,
    hyperfindActiveSessionUid: state.ui.hyperfindActiveSessionUid,
  })
);

export const passProps = (uid, parentProps, props) => (
  Object.assign(props, {
    focussedSessionUid: parentProps.focussedSessionUid,
    hyperfindActiveSessionUid: parentProps.hyperfindActiveSessionUid,
  })
);

export const mapTermsDispatch = (dispatch, map) => map;

export const getTermGroupProps = passProps;
export const getTermProps = passProps;
