import React, { Component } from "react";
import { connect } from "react-redux";
import Collection from "./Collection";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Col,
  Alert
} from "reactstrap";
import { createCollection } from "./actions";

class Collections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputName: "",
      copyText: "",
      showAlert: false
    };
    this.onClickAddCollection = this.onClickAddCollection.bind(this);

    this.copyTextContainer = React.createRef();
    this.onClickCopy = this.onClickCopy.bind(this);
  }

  onClickAddCollection() {
    this.props.newCollection(this.state.inputName);
    this.setState({ inputName: "" });
  }

  onClickCopy(values) {
    this.setState(
      {
        copyText: values.join(","),
        showAlert: true
      },
      () => {
        this.copyTextContainer.current.select();
        document.execCommand("copy");
        this.setState({
          copyText: ""
        });
        setTimeout(() => {
          this.setState({showAlert: false});
        }, 2000);
      }
    );
  }

  render() {
    return (
      <div className="collections">
        <Row>
          <Alert color="success" isOpen={this.state.showAlert}>
            Items copied to clipboard
          </Alert>
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
            <Col sm="6" key={"col-" + collection.id}>
              <Collection
                collection={collection}
                canDelete={this.props.collections.length > 1}
                onCopyItems={this.onClickCopy}
              />
            </Col>
          ))}
        </Row>
        {(() => {
          if (this.state.copyText) {
            return (
              <input
                type="text"
                readOnly
                value={this.state.copyText}
                ref={this.copyTextContainer}
              />
            );
          }
        })()}
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
