import React, {useState} from 'react';
import Layout from "./MyLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import './shop-homepage.css';
import fetch from 'isomorphic-unfetch';
import {Card, CardBody, CardImg, CardTitle, Col} from "reactstrap";
import Row from "reactstrap/lib/Row";
import './App.css';

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
    /*
    var goods = async function() {
      const res = await fetch('http://clearancegood-env.xe4i3r2rmx.us-east-2.elasticbeanstalk.com/goods');

      const data = await res.json();

      console.log(`Show data fetched. Count: ${data.length}`);
      return data;
    };
    */
    this.setState({
      isLoaded: false,
      isLoading: true,
      data: {},
    });
    console.log('state set to isloading');
  };

  componentDidMount() {
    fetch('https://api.clearancefinds.club/goods')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            isLoading: false,
            data: result
          });
          console.log('state set to isLoaded');
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  //if(this.goods) {
  render() {

    const imgStyle = {
      //flex: 1,
      //aspectRatio: 1.5,
      //minWidth: 500,
      maxWidth: 500,
      minHeight: 350,
      maxHeight: 350,
      resizeMode: 'contain'
    };

    const handleSearch = (data) => {
        //data = manipulateImage(data);
        //setGoods(data);
        this.setState({
          isLoaded: true,
          isLoading: false,
          data: data
        });
    };

    const handleNextPage = (data) => {
        //data = manipulateImage(data);
        let pre = this.state.data;
        let newGoods = pre.concat(data);
        //setGoods(newGoods);
        this.setState({
          isLoaded: true,
          isLoading: false,
          data: newGoods
        });
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
                        <CardImg top src={g.picture}></CardImg>
                        <CardBody>
                            <CardTitle tag="h4">
                                <a href={g.link}>{g.name}</a>
                            </CardTitle>
                            <h5 style={{color: 'red'}}>${g.price}</h5><strike
                            style={{color: 'grey'}}>${g.regPrice}</strike>
                            &nbsp;&nbsp;<span>{g.seller_id}</span>
                        </CardBody>
                    </Card>

                </Col>
            ))}
            </Row>
        </Layout>
    );
  }

};

export default App;
