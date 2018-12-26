import PropTypes from 'prop-types';

export default (Term, { React }) => class extends React.Component {
  static propTypes = {
    onDecorated: PropTypes.func,
  };

  static defaultProps = {
    onDecorated: undefined,
  };

  constructor(props, context) {
    super(props, context);
    this.term = null;
    this.onDecorated = this.onDecorated.bind(this);
  }

  componentDidMount() {
    window.rpc.on('hyperfind:find', () => {
      /* Awesome plugin feature */
    });
    window.rpc.on('hyperfind:findnext', () => {
      /* Awesome plugin feature */
    });
    window.rpc.on('hyperfind:findprev', () => {
      /* Awesome plugin feature */
    });
  }

  onDecorated(term) {
    this.term = term;
    const { onDecorated } = this.props;
    // Don't forget to propagate it to HOC chain
    if (onDecorated) onDecorated(term);
  }

  render() {
    return (
      <React.Fragment>
        <div className="hyperfind-wrapper">
          <input id="hyperfind-input" placeholder="Find" />
          <button type="button">❮</button>
          <button type="button">❯</button>
        </div>
        <Term {...this.props} />
      </React.Fragment>
    );
  }
};
