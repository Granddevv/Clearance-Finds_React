import React, {useState} from 'react';
import Layout from "./MyLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import './shop-homepage.css';
import fetch from 'isomorphic-unfetch';
import {Card, CardBody, CardImg, CardTitle, Col} from "reactstrap";
import Row from "reactstrap/lib/Row";

class App extends React.Component {
  constructor(props) {
    super(props);
    //this.goods = null
    this.state = {
      isLoaded: false,
      isLoading: false,
      data: {},
    };
    console.log('marker');
    //console.log(this.goods);
  };

  componentWillMount() {
    var goods = async function() {
      const res = await fetch('http://clearancegood-env.xe4i3r2rmx.us-east-2.elasticbeanstalk.com/goods');

      const data = await res.json();

      console.log(`Show data fetched. Count: ${data.length}`);
      return data;
    };
    this.setState({
      isLoaded: true,
      isLoading: true,
      data: goods,
    });
    console.log('state set');
  };

  //if(this.goods) {
  render() {
    /*
    const manipulateImage = (gs) => {
        return gs;
    };
    */
    const imgStyle = {
      //flex: 1,
      //aspectRatio: 1.5,
      //minWidth: 500,
      maxWidth: 500,
      minHeight: 300,
      maxHeight: 400,
      resizeMode: 'contain'
    };

    //const gg = manipulateImage(this.goods);
    //const [goods, setGoods] = useState(gg);

    const handleSearch = (data) => {
        //data = manipulateImage(data);
        //setGoods(data);
        this.state.data = data;
    };

    const handleNextPage = (data) => {
        //data = manipulateImage(data);
        let newGoods = this.state.data.concat(data);
        //setGoods(newGoods);
        this.state.data = newGoods;
    };

    if (!this.state.isLoaded){
        return <div>Loading...</div>
    }

    return (
        <Layout handleSearch={handleSearch} handleNextPage={handleNextPage}>
            <Row>
            {this.state.data.map(g => (
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
    );
  }
  //} else { return (<div />) };

};

/*
const App = (props) => {

    componentDidMount() {
      console.log(props.goods)
    }

    const manipulateImage = (gs) => {

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
    };
    if(props.goods) {
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
  } else { return (<div />) };
};
*/
/*
App.getInitialProps = async function () {
    const res = await fetch('http://clearancegood-env.xe4i3r2rmx.us-east-2.elasticbeanstalk.com/goods');

    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.length}`);
    return {
        goods: data
    };
};
*/
export default App;
