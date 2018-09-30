import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Input,
  InputGroup,
  Row,
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
      currentCollection: this.getCollectionName(this.props.currentCollection),
      dropdownOpen: false,
      splitButtonOpen: false
    };

    this.onClickAddValues = this.onClickAddValues.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
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
      .split(",")
      .map(item => item.trim().split(" "))
      .flat()
      .filter(a => a)
      .map(item => item.replace("#", ""));
  }

  render() {
    return (
      <Row>
        <InputGroup>
          <InputGroupButtonDropdown
            addonType="prepend"
            isOpen={this.state.splitButtonOpen}
            toggle={this.toggleSplit}
          >
            <Button onClick={this.onClickAddValues}>
              Add to <strong>{this.state.currentCollection}</strong>
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
