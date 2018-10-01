import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Input,
  InputGroup,
  Row,
  Col,
  InputGroupButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import { addItems, selectCollection } from "./actions";

class ItemsEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textareaVal: "",
      dropdownOpen: false,
      splitButtonOpen: false
    };

    this.onClickAddValues = this.onClickAddValues.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.getCollectionName = this.getCollectionName.bind(this);
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  onClickAddValues() {
    this.props.addItems(this.sanitizeInput(this.state.textareaVal));
  }

  getCollectionName(id) {
    return this.props.collections.find(collection => collection.id === id).name;
  }

  onCurrentCollectionChange(id) {
    this.setState({ currentCollection: this.getCollectionName(id) });
    this.props.selectCollection(id);
  }

  sanitizeInput(unsanitizedString) {
    return unsanitizedString
      .trim()
      .replace(/\s/gm, ",")
      .replace(/#/gm, "")
      .split(",")
      .filter(a => a);
  }

  render() {
    return (
      <Row>
        <Col>
        <InputGroup>
          <InputGroupButtonDropdown
            addonType="prepend"
            isOpen={this.state.splitButtonOpen}
            toggle={this.toggleSplit}
          >
            <Button onClick={this.onClickAddValues}>
              Add to <strong>{this.getCollectionName(this.props.currentCollection)}</strong>
            </Button>
            <DropdownToggle split />
            <DropdownMenu>
              {this.props.collections.map(collection => {
                return (
                  <DropdownItem
                    onClick={() => {
                      this.onCurrentCollectionChange(collection.id);
                    }}
                    key={"selectcol-" + collection.id}
                  >
                    {collection.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input
            type="textarea"
            placeholder="item1, item2, item3 or item1 item2 item3"
            value={this.state.textareaVal}
            onChange={event =>
              this.setState({ textareaVal: event.target.value })
            }
          />
        </InputGroup>
        </Col>
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
