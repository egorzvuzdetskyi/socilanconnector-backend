import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import PropTypes from 'prop-types';
import {
    Spinner
} from "../common/index";
import {getPost} from "../../actions/postActions";
import PostItem from "../posts/PostItem";
import {Link} from "react-router-dom/umd/react-router-dom";

class Post extends Component{

    componentDidMount(){
        const postId = this.props.match.params.id;
        this.props.getPost(postId);
    }

    render() {
        const {
            post,
            loading
        } = this.props.post;
        let postContent;

        if(post === null || loading || Object.keys(post).length === 0) {
            postContent = <Spinner/>
        } else {
            postContent = (
                <div>
                    <PostItem post={post} showActions={false}/>
                </div>
            )
        }

        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3" >
                                Back to feed
                            </Link>
                            {
                                postContent
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {
    getPost
})(Post);