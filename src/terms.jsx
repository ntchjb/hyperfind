import PropTypes from 'prop-types';

export default (Terms, { React }) => class extends React.Component {
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
    this.onDecorated = this.onDecorated.bind(this);
  }

  onDecorated(terms) {
    this.terms = terms;
    const { onDecorated } = this.props;
    if (onDecorated) onDecorated(terms);
    if (this.terms) {
      this.terms.registerCommands({
        'hyperfind:selectAll': (e) => {
          const term = this.terms.getActiveTerm();
          if (term) {
            term.handleSelectAll();
          }
          // e parameter is React key event
          e.preventDefault();
        },
      });
    }
  }

  render() {
    return (
      <Terms {...this.props} onDecorated={this.onDecorated} />
    );
  }
};
