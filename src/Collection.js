import React from "react";
import { connect } from "react-redux";
import { removeItem, deleteCollection } from "./actions";
import {
  Button,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Badge
} from "reactstrap";

const Collection = ({
  collection,
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
          disabled={!canDelete}
          color="danger"
          onClick={() => {
            onClickRemoveCollection(id);
          }}
        >
          DELETE COLLECTION &times;
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
