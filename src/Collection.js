import React from "react";
import { connect } from "react-redux";
import { removeItem, deleteCollection } from "./actions";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Badge,
  Input
} from "reactstrap";

const Collection = ({
  collection,
  onCopyItems,
  onClickRemoveItem,
  onClickRemoveCollection,
  canDelete
}) => {
  const { name, id, values } = collection;
  return (
    <Card>
      <CardHeader>
        {name} <Badge>{values.length || 0}</Badge>
      </CardHeader>

      <CardBody>
        <CardText>
          {values.map((val, i) => (
            <Badge className="m-1 p-2" color="dark" pill key={id + "-" + i}>
              {val}{" "}
              <a
                href="#"
                onClick={() => {
                  onClickRemoveItem(val, id);
                }}
              >
                &times;
              </a>
            </Badge>
          ))}
        </CardText>
        <Button
          color="info"
          onClick={() => {onCopyItems(values)}}>
            Copy tags
          </Button>
        <Button
          disabled={!canDelete}
          color="danger"
          onClick={() => {
            onClickRemoveCollection(id);
          }}
        >
          <strong>DELETE COLLECTION &times;</strong>
        </Button>
      </CardBody>
    </Card>
  );
};

const mapDispatchToProps = dispatch => ({
  onClickRemoveCollection: id => dispatch(deleteCollection(id)),
  onClickRemoveItem: (id, colId) => dispatch(removeItem(id, colId))
});

export default connect(
  null,
  mapDispatchToProps
)(Collection);
