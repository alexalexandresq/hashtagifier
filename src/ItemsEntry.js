import React, { Component } from "react";
import { Input, Button, Row } from "reactstrap";
import { connect } from "react-redux";
import { addItems, selectCollection } from "./actions";

class ItemsEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textareaVal: "",
      currentCollection: this.props.currentCollection
    };

    this.onClickAddValues = this.onClickAddValues.bind(this);
    this.onCurrentCollectionChange = this.onCurrentCollectionChange.bind(this);
  }

  onClickAddValues() {
      this.props.addItems(this.sanitizeInput(this.state.textareaVal));
  }

  onCurrentCollectionChange(event) {
    this.setState({currentCollection: event.target.value});
    this.props.selectCollection(event.target.value);
  }

  sanitizeInput(unsanitizedString) {
    return unsanitizedString
      .trim()
      .split(',')
      .map(item => item
        .trim()
        .split(' '))
      .flat()
      .filter(a => a)
      .map(item => item.replace('#', ''));
  }

  render() {
    return (
      <Row>
        <Input
          type="textarea"
          placeholder="item1, item2, item3 or item1 item2 item3"
          value={this.state.textareaVal}
          onChange={event => this.setState({ textareaVal: event.target.value })}
        />
        <Button onClick={this.onClickAddValues}>Add values</Button>

        <Input type="select" value={this.state.currentCollection} onChange={this.onCurrentCollectionChange}>
            {this.props.collections.map(collection => {
                return <option value={collection.id} key={'selectcol-' + collection.id}>{collection.name}</option>
            })}
        </Input>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  collections: state.collections,
  currentCollection: state.currentCollection
});
const mapDispatchToProps = dispatch => ({
  addItems: values => dispatch(addItems(values)),
  selectCollection: collectionId => dispatch(selectCollection(collectionId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsEntry);
