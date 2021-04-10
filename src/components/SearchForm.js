import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const SearchForm = ({ loading, searchInput, handleSearch, handleSubmit }) => {
  // console.log("Search input:", searchInput);
  // console.log("handle Search:", handleSearch);
  // console.log("handle Submit:", handleSubmit);
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Control
              placeholder="Search..."
              value={searchInput}
              onChange={handleSearch}
            />
          </Col>
          {loading ? (
            <Button disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Đang tìm! chờ xíu...
            </Button>
          ) : (
            <Button type="submit">Search</Button>
          )}
        </Form.Row>
      </Form>
    </div>
  );
};

export default SearchForm;
