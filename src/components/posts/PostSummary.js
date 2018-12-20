import React from 'react'
import moment from 'moment'

const PostSummary = ({ post }) => {
  return (
    <section className="section is-paddingless-horizontal" style={{paddingTop: 0, paddingBottom: 0}}>
      {/* <div className="container grid" style={{maxWidth: 1024}}> */}

        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="img" />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{ post.title }</p>
                <p className="subtitle is-6">@{ post.authorId }</p>
              </div>
            </div>

            <div className="content">
              { post.content }
              <br />
              <time dateTime={moment(post.createdAt.toDate()).calendar()}>{ moment(post.createdAt.toDate()).calendar() }</time>
            </div>
          </div>
        </div>

      {/* </div> */}
    </section>
  )
}

export default PostSummary
