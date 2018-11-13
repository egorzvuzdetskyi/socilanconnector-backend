import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from '../common/Spinner'
import {Link} from "react-router-dom";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick = (e) => {
        e.preventDefault();
        this.props.deleteAccount();
    };

    render() {

        const {
                user
            } = this.props.auth,
            {
                profile,
                loading
            } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading === true) {
            dashboardContent = <Spinner/>;
        } else {
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                        </p>
                        <ProfileActions/>
                        {
                            /*
                            * TODO: add experience and education*/
                        }
                        <div style={{
                            marginBottom: '60px'
                        }}/>
                        <button onClick={this.onDeleteClick} className="btn btn-danger">
                            Delete my account
                        </button>
                    </div>
                )
            } else {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome {user.name}
                        </p>
                        <p>You have not yet set up a profile, please add some info</p>
                        <Link to='create-profile' className="btn btn-lg btn-info">
                            Create profile
                        </Link>
                    </div>
                )
            }
        }

        return (
            <div className='dashboard'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">
                                Dashboard
                            </h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {
    getCurrentProfile,
    deleteAccount
})(Dashboard);