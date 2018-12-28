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
          const { activeSession, hyperfindActiveSessionUid } = this.terms.props;
          let term = null;
          /* Current active session vs. Session that focused hyperfind input lived in */
          console.log(hyperfindActiveSessionUid);
          if (hyperfindActiveSessionUid) {
            if (activeSession !== hyperfindActiveSessionUid) {
              term = this.terms.terms[hyperfindActiveSessionUid];
            } else {
              term = this.terms.getActiveTerm();
            }
          } else {
            term = this.terms.getActiveTerm();
          }
          if (term) {
            term.handleSelectAll();
          }
          console.log(this.terms);
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
