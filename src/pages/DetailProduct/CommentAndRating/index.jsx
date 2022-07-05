import React from "react";

import { Row, Col, Card, Rate } from "antd";

function CommentAndRating({ commentList }) {
  return commentList.data.map(({ comment, email }, index) => {
    return (
      <Col md={6}>
        {
          <div className="site-card-border-less-wrapper" key={index}>
            <Card title={email}>
              <Row gutter={16}>
                <Col span={24}>
                  Rating:
                  <Rate value={comment.rate} />
                </Col>
                <Col span={24}>Nhận xét: {comment.description}</Col>
              </Row>
            </Card>
          </div>
        }
      </Col>
    );
  });
}

export default CommentAndRating;
