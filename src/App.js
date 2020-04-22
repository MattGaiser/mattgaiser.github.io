import React from 'react';
//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-checkbox/assets/index.css';
import TextareaAutosize from 'react-textarea-autosize';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab, faFacebookSquare, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {
    faCheckSquare,
    faCoffee,
    faCheck,
    faTimesCircle,
    faExclamationTriangle,
    faPhoneAlt,
    faCommentAlt,
    faEnvelope,
    faPaperPlane,
    faUserEdit
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Button} from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-bootstrap/Modal";
library.add(fab, faCheckSquare, faCoffee, faCheck, faTimesCircle, faExclamationTriangle, faFacebookSquare, faTwitter, faPhoneAlt, faCommentAlt, faEnvelope, faPaperPlane, faUserEdit);

toast.configure({
    autoClose: 8000,
    draggable: false,
    position: toast.POSITION.TOP_CENTER
});


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            facebookStatusCode: 'ready',
            twitterStatusCode: 'ready',
            phoneStatusCode: 'ready',
            textStatusCode: 'ready',
            emailStatusCode: 'ready',
            letterStatusCode: 'ready',
            message: '',
            showModal: false,
            showRequestModal: false,
            substrings: ["can't", "won't", "don't"],
            estimatedCost: 38.13,
            costModal: false

        };
        this.onTextAreaChange = this.onTextAreaChange.bind(this);
        this.resetPage = this.resetPage.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showApprovals = this.showApprovals.bind(this);
        this.closeRequestModal = this.closeRequestModal.bind(this);
        this.showRequestApprovals = this.showRequestApprovals.bind(this);
        this.sendRequestModal = this.sendRequestModal.bind(this);
        this.showCostModal = this.showCostModal.bind(this);
        this.hideCostModal = this.hideCostModal.bind(this);

    }
    showCostModal(){
        this.setState({
            costModal: true
        })
    }
    hideCostModal(){
        this.setState({
            costModal: false
        })
    }


    showRequestApprovals(){
        this.setState({
            showRequestModal: true
        })
    }

    showApprovals(){
        this.setState({
            showModal: true
        })
    }

    closeRequestModal() {
        this.setState({
            showRequestModal: false,
        })
    }

    sendRequestModal() {
        this.setState({
            showRequestModal: false,
        });
        toast.success("Invite sent");
    }


    closeModal() {
        this.setState({
            showModal: false,
        })
    }

    resetPage() {
        this.setState({
            disabled: false,
            facebookStatusCode: 'ready',
            twitterStatusCode: 'ready',
            phoneStatusCode: 'ready',
            textStatusCode: 'ready',
            emailStatusCode: 'ready',
            letterStatusCode: 'ready',
            message: ''
        });

        toast.success("Message Sent");
    }


    twitterValidation(text) {
        if ( text.length > 280) {
            return 'fail, too-long';
        }
        return 'ready';
    }

    textValidation(text) {
        if ( text.length > 160) {
            return 'fail, too-long';
        }
        return 'ready';
    }

    onTextAreaChange(e) {
        this.setState({
            twitterStatusCode: this.twitterValidation(e.target.value),
            textStatusCode: this.textValidation(e.target.value),
            message: e.target.value
        })
    }

    messageStatusSymbolGenerator(code) {
        if (code === 'ready') {
            return (<span className='good-green'><FontAwesomeIcon icon="check"/></span>);
        }

        if (code.includes('fail')){
            return (<span className='fail-orange'><FontAwesomeIcon icon="exclamation-triangle"/></span>);
        }
    }

    generateIssues() {
        let listOfIssues = [];
        const twitterResult = this.checkIssueList(this.state.twitterStatusCode, "tweet");
        const textResult = this.checkIssueList(this.state.textStatusCode, "text");
        listOfIssues = listOfIssues.concat(twitterResult, textResult);
        if (this.state.substrings.some(v => this.state.message.toLowerCase().includes(v))) {
            listOfIssues.push(
                <div className=" col-4" role="alert">
                <div className='alert alert-danger ml-4 mr-4'>
                    Our style guide does not allow contractions. Please replace with the full word.
                </div>
            </div>)
        }
        return listOfIssues;
    }

    checkIssueList(statusCode, statusString) {
        const listOfIssues = [];
        if (statusCode.includes("too-long")){
            listOfIssues.push(<div className=" col-4" role="alert">
                <div className='alert alert-warning ml-4 mr-4'>
                    This is too long to be a {statusString}. It will need to be broken into multiple {statusString}s.
                </div>
            </div>)
        }

        return listOfIssues;
    }


    render() {
        return (
            <div className="App container">
                <div className="header">
                    <a href="#default" className="logo">
                        <img className="logo" width="50px"
                                                             src="https://innisfil.ca/wp-content/uploads/2019/06/logo.svg"/>
                    </a>
                    <div className="header-right glex">
                        <Button className="active glex"
                                onClick={this.resetPage}
                        >Send Message</Button>
                    </div>
                </div>
                <div className="cladding">
                    <div className="row">
                        <div className='col-8'>
                            <p>Enter Your Message Below</p>
                            <TextareaAutosize
                                value={this.state.message}
                                minRows={10}
                                onChange={this.onTextAreaChange}
                            />
                            <div className="btn-group">
                                <Button
                                    onClick={this.showRequestApprovals}>Request Approval</Button>
                                <Button
                                 onClick={this.showApprovals}>Show Approvals</Button>
                            </div>
                        </div>
                        <div className='col-4 avenues-panel'>
                            <div className='row'>
                                <div className='col-8 margin-15-centre'>
                                    <span>Message Type</span>
                                </div>
                                <div className='col-4  margin-15-centre text-center'>
                                    <span>Status</span>
                                </div>
                                <div className='col-8 margin-15-centre'>
                                    <span className='facebook'><FontAwesomeIcon icon={['fab', 'facebook-square']}/> Facebook</span>
                                </div>
                                <div className='col-4 icon-sizer'>
                                    <span className='good-green'><FontAwesomeIcon icon="check"/></span>

                                </div>
                                <div className='col-8 margin-15-centre'>
                                    <span className='twitter'><FontAwesomeIcon
                                        icon={['fab', 'twitter']}/> Twitter</span>
                                </div>
                                <div className='col-4 icon-sizer'>
                                    {this.messageStatusSymbolGenerator(this.state.twitterStatusCode)}
                                </div>
                                <div className='col-8 margin-15-centre'>
                                    <span className='phone'><FontAwesomeIcon icon="phone-alt"/> Phone Call</span>
                                </div>
                                <div className='col-4 icon-sizer'>
                                    <span className='good-green'><FontAwesomeIcon icon="check"/></span>

                                </div>
                                <div className='col-8 margin-15-centre'>
                                    <span className='text-message'><FontAwesomeIcon
                                        icon="comment-alt"/> Text Message</span>
                                </div>
                                <div className='col-4 icon-sizer'>
                                    {this.messageStatusSymbolGenerator(this.state.textStatusCode)}

                                </div>
                                <div className='col-8 margin-15-centre'>
                                    <span className='email'><FontAwesomeIcon icon="paper-plane"/> Email</span>
                                </div>
                                <div className='col-4 icon-sizer'>
                                    <span className='good-green'><FontAwesomeIcon icon="check"/></span>

                                </div>
                                <div className='col-8 margin-15-centre'>
                                    <span className='postal-letter'><FontAwesomeIcon
                                        icon="envelope"/> Physical Letter</span>
                                </div>
                                <div className='col-4 icon-sizer'>
                                    <span className='good-green'><FontAwesomeIcon icon="check"/></span>

                                </div>
                            </div>
                            <br/>
                            <div className='row'>
                                <div className='col-8 text-left'>
                                    <span className=''>Estimated Cost</span>
                                </div>
                                <div className='col-4'>
                                    <span className=''>$CAD {this.state.estimatedCost.toFixed(2)}</span>
                                </div>
                                <Button className="active glex center-button"
                                        onClick={this.showCostModal}
                                        size={'sm'}
                                >Cost Breakdown</Button>

                            </div>

                        </div>
                    </div>
                    <hr/>
                    <div>
                        <p>Issues with the Message</p>
                        <div className='row no-gutters'>
                            {this.generateIssues()}
                        </div>
                    </div>
                </div>
                <Modal show={this.state.showModal} onHide={this.closeModal} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Approvals of Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><div className='row'>
                        <div className='col-8 margin-15-centre'>
                            <span>Person</span>
                        </div>
                        <div className='col-4  margin-15-centre text-center'>
                            <span>Status</span>
                        </div>
                        <div className='col-8 margin-15-centre'>
                            <span className='facebook'><FontAwesomeIcon icon='user-edit'/> Mayor Lynn Dollin</span>
                        </div>
                        <div className='col-4 text-center'>
                            <span className='good-green'>Approved</span>
                        </div>
                        <div className='col-8 margin-15-centre'>
                            <span className='facebook'><FontAwesomeIcon icon='user-edit'/> Communication Director Ellen Anders</span>
                        </div>
                        <div className='col-4 text-center'>
                            <span className='good-grey'>Pending</span>
                        </div>
                        <div className='col-8 margin-15-centre'>
                            <span className='facebook'><FontAwesomeIcon icon='user-edit'/> Emergency Manager Mike Dawson</span>
                        </div>
                        <div className='col-4 text-center'>
                            <span className='good-green'>Approved</span>
                        </div>
                    </div></Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showRequestModal} onHide={this.closeRequestModal} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Request Approval of Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                        <form className='form-setup row form-group'>
                            <div className='col-6'>
                                <p>Enter an email address:</p>
                            </div>
                            <div className='col-6'>
                                <input
                                    type="email"
                                />
                            </div>

                        </form>
                    </div></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeRequestModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.sendRequestModal}>
                            Send Invite
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.costModal} onHide={this.hideCostModal} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cost Breakdown of Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <table>
                                <tbody>
                                <tr>
                                    <th>Sending Medium</th>
                                    <th>Price Per Unit</th>
                                    <th>Units</th>
                                    <th>Total Price</th>
                                </tr>
                                <tr>
                                    <td>Facebook</td>
                                    <td>$0.00</td>
                                    <td>2136</td>
                                    <td>Free</td>
                                </tr>
                                <tr>
                                    <td>Twitter</td>
                                    <td>$0.00</td>
                                    <td>940</td>
                                    <td>Free</td>
                                </tr>
                                <tr>
                                    <td>Phone Call</td>
                                    <td>$0.04</td>
                                    <td>438</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td>Text Message</td>
                                    <td>$0.0025</td>
                                    <td>742</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>Free</td>
                                    <td>6348</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td>Physical Letter</td>
                                    <td>$1.25</td>
                                    <td>15</td>
                                    <td>15</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Total:</td>
                                    <td>$38.13</td>
                                </tr>
                                </tbody>
                            </table>

                        </div></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideCostModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default App;
