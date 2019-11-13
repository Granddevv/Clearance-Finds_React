import React, {useState} from 'react';
import Layout from "./MyLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import './shop-homepage.css';
import fetch from 'isomorphic-unfetch';
import {Card, CardBody, CardImg, CardTitle, Col} from "reactstrap";
import Row from "reactstrap/lib/Row";

if(this.props.goods) {
const App = (props) => {
    const manipulateImage = (gs) => {
    /*
        for (let g of gs) {
          if (g.picture.indexOf("images.ulta.com")) {
                   let lastS = g.picture.lastIndexOf("/");
                   const str2 = g.picture.substring(lastS);
                   g.picture = 'https://res.cloudinary.com/daremighty/image/upload/w_500,h_500,c_scale/ulta/' + str2
          }
        }
        */
        return gs;
    };

    const imgStyle = {
      //flex: 1,
      //aspectRatio: 1.5,
      //minWidth: 500,
      maxWidth: 500,
      minHeight: 300,
      maxHeight: 400,
      resizeMode: 'contain'
    };

    const gg = manipulateImage(props.goods);
    const [goods, setGoods] = useState(gg);

    const handleSearch = (data) => {
        data = manipulateImage(data);
        setGoods(data);
    };

    const handleNextPage = (data) => {
        data = manipulateImage(data);
        let newGoods = goods.concat(data);
        setGoods(newGoods);
    }
    return (
        <Layout handleSearch={handleSearch} handleNextPage={handleNextPage}>
            <Row>
            {goods.map(g => (
                <Col lg={4} md={6} sm={4} key={g.id}>
                    <Card>
                        <CardImg top src={g.picture} style={imgStyle}></CardImg>
                        <CardBody>
                            <CardTitle tag="h4">
                                <a href={g.link}>{g.name}</a>
                            </CardTitle>
                            <h5 style={{color: 'red'}}>${g.price}</h5><strike
                            style={{color: 'grey'}}>${g.regPrice}</strike>
                            &nbsp;&nbsp;<span>{g.seller.name}</span>
                        </CardBody>
                    </Card>

                </Col>
            ))}
            </Row>
        </Layout>
    )
};
};
App.getInitialProps = async function () {
    const res = await fetch('http://clearancegood-env.xe4i3r2rmx.us-east-2.elasticbeanstalk.com/goods');

    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.length}`);
    return {
        goods: data
    };
};

export default App;
