import { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Collapse,
  Button,
} from "reactstrap";
import "./plantcard.css";

const PlantCard = ({ plant }) => {
  const [edibleCollapse, setEdibleCollapse] = useState([]);
  const [propagationCollapse, setPropagationCollapse] = useState([]);
  const [taxonomyCollapse, setTaxonomyCollapse] = useState([]);
  const [wikiCollapse, setWikiCollapse] = useState([]);

  const toggleCollapse = (idx, collapseType) => {
    if (collapseType === "wiki") {
      let collapseCopy = [...wikiCollapse];
      collapseCopy[idx] = !collapseCopy[idx];
      setWikiCollapse(collapseCopy);
    }
    if (collapseType === "edible") {
      let collapseCopy = [...edibleCollapse];
      collapseCopy[idx] = !collapseCopy[idx];
      setEdibleCollapse(collapseCopy);
    }
    if (collapseType === "taxonomy") {
      let collapseCopy = [...taxonomyCollapse];
      collapseCopy[idx] = !collapseCopy[idx];
      setTaxonomyCollapse(collapseCopy);
    }
    if (collapseType === "propagation") {
      let collapseCopy = [...propagationCollapse];
      collapseCopy[idx] = !collapseCopy[idx];
      setPropagationCollapse(collapseCopy);
    }
  };

  return (
    <Row className="w-80 d-flex justify-content-center p-0 g-0">
      {plant.plantList ? (
        <>
          {plant.plantList.images.map((img) => {
            return (
              <>
                <img
                  src={img.url}
                  className="w-25 rounded img-thumbnail p-2"
                  alt="Uploaded img"
                  value={img.url}
                />
              </>
            );
          })}
          {plant.plantList.suggestions.map((item, idx) => {
            /* Turn long decimal to 2 decimal places, convert to percentage, and make sure percentage has no decimal places
             */
            let twoDecimalPlaces = item.probability.toFixed(2) * 100;
            let probability = parseInt(twoDecimalPlaces);
            return (
              <Card className="card border bg-dark text-light">
                <Row className="p-0 g-0">
                  {/* Probability Col */}
                  <Col
                    sm="2"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <h5 className="text-center" style={{ fontSize: "2vh" }}>
                      {probability} %<div>Probability</div>
                    </h5>
                  </Col>
                  {/* End of Probability Col */}

                  {/* Plant Info */}
                  <Col sm="6" className="border-end border-start border-3 py-4">
                    <CardTitle className="text-center display-6">
                      {item.plant_name}
                    </CardTitle>
                    {item.plant_details.wiki_description !== null ? (
                      <div>
                        <Button
                          className="toggleBtn"
                          onClick={() => toggleCollapse(idx, "wiki")}
                        >
                          Wiki Description
                        </Button>
                        <Collapse isOpen={wikiCollapse[idx]}>
                          <CardBody className="fs-5">
                            {item.plant_details.wiki_description.value}
                            <br></br>
                            <a href={item.plant_details.url}>
                              {item.plant_details.url}
                            </a>
                            <hr />
                          </CardBody>
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {item.plant_details.taxonomy !== null ? (
                      <div>
                        <Button
                          className="toggleBtn"
                          onClick={() => toggleCollapse(idx, "taxonomy")}
                        >
                          Taxonomy
                        </Button>
                        <Collapse isOpen={taxonomyCollapse[idx]}>
                          <CardBody className="fs-5">
                            {Object.entries(item.plant_details.taxonomy).map(
                              ([key, val], i) => (
                                <p key={i}>
                                  {key}: {val}
                                </p>
                              )
                            )}
                            <hr />
                          </CardBody>
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {item.plant_details.propagation_methods !== null ? (
                      <div>
                        <Button
                          className="toggleBtn"
                          onClick={() => toggleCollapse(idx, "propagation")}
                        >
                          Propagation Method
                        </Button>
                        <Collapse isOpen={propagationCollapse[idx]}>
                          <CardBody className="fs-5">
                            {item.plant_details.propagation_methods.map((i) => {
                              return <p>{i}</p>;
                            })}
                            <hr />
                          </CardBody>
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}

                    {item.plant_details.edible_parts !== null ? (
                      <div>
                        <Button
                          className="toggleBtn"
                          onClick={() => toggleCollapse(idx, "edible")}
                        >
                          Edible Parts
                        </Button>
                        <Collapse isOpen={edibleCollapse[idx]}>
                          <CardBody className="fs-5">
                            {item.plant_details.edible_parts.map((i) => {
                              return <p>{i}</p>;
                            })}
                          </CardBody>
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                  </Col>
                  {/* End of Plant Info */}

                  {/* Plant Img */}
                  <Col
                    sm="4"
                    className="d-flex align-items-center justify-content-center"
                  >
                    {item.similar_images.map((img) => {
                      return (
                        <div>
                          <img
                            src={img.url}
                            className="img-fluid"
                            alt=""
                            value={img.url}
                            style={{ height: "100%", objectFit: "contain" }}
                          />
                        </div>
                      );
                    })}
                  </Col>
                  {/* End of Plant Img Carousel */}
                </Row>
              </Card>
            );
          })}
        </>
      ) : (
        <p>OH OH SOMETHING WENT WRONG</p>
      )}
    </Row>
  );
};

export default PlantCard;
