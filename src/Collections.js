import React, { Component } from "react";
import { connect } from "react-redux";
import Collection from "./Collection";
import { Button, Input, InputGroup, InputGroupAddon, Row } from "reactstrap";
import { createCollection } from "./actions";

class Collections extends Component {
  constructor(props) {
    super(props);

    this.state = { inputName: "" };
    this.onClickAddCollection = this.onClickAddCollection.bind(this);
  }

  onClickAddCollection() {
    this.props.newCollection(this.state.inputName);
    this.setState({ inputName: "" });
  }

  render() {
    return (
      <div className="collections">
        <Row>
          <InputGroup>
            <Input
              type="text"
              value={this.state.inputName}
              onChange={event => {
                this.setState({ inputName: event.target.value });
              }}
              placeholder="New Collection"
            />
            <InputGroupAddon addonType="append">
              <Button color="success" onClick={this.onClickAddCollection}>
                Add
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Row>
        <Row>
          {this.props.collections.map(collection => (
            <Collection
              key={"col-" + collection.id}
              collection={collection}
              canDelete={this.props.collections.length > 1}
            />
          ))}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  collections: state.collections
});

const mapDispatchToProps = dispatch => ({
  newCollection: name => dispatch(createCollection(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collections);
