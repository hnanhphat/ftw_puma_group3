import React from "react";
import { Button, Col, Form } from "react-bootstrap";

const SearchForm = ({ loading, searchInput, handleSearch, handleSubmit }) => {
  return (
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
  );
};

export default SearchForm;
