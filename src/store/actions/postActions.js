export const addPost = post => {
  return (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();
    const profile = getState().firebase.profile;
    const authorUid = getState().firebase.auth.uid;

    db.collection('posts')
      .add({
        ...post,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: profile.id,
        authorUid: authorUid,
        like: 0,
        dislike: 0,
        createdAt: new Date()
      })
      .then(dispatch({ type: 'ADD_POST', post }))
      .catch(err => dispatch({ type: 'ADD_POST_ERR', err }));
  };
};

export const updatePost = post => {
  return (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();

    db.collection('posts')
      .doc(post.pid)
      .update({
        title: post.title,
        subtitle: post.subtitle,
        content: post.content,
        editedAt: new Date()
      })
      .then(dispatch({ type: 'UPDATE_POST', post }))
      .catch(err => dispatch({ type: 'UPDATE_POST_ERR', err }));
  };
};

export const deletePost = pid => {
  return (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();

    db.collection('posts')
      .doc(pid)
      .delete()
      .then(dispatch({ type: 'DELETE_POST', pid }))
      .catch(err => dispatch({ type: 'DELETE_POST_ERR', err }));
  };
};

export const likePost = pid => {
  return (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();

    db.collection('posts')
      .doc(pid)
      .get()
      .then(doc => {
        const like = doc.data().like + 1;
        db.collection('posts')
          .doc(pid)
          .update({
            like: like
          });
      })
      .then(dispatch({ type: 'LIKE_POST', pid }))
      .catch(err => dispatch({ type: 'LIKE_POST_ERR', err }));
  };
};

export const dislikePost = pid => {
  return (dispatch, getState, { getFirestore }) => {
    const db = getFirestore();

    db.collection('posts')
      .doc(pid)
      .get()
      .then(doc => {
        const dislike = doc.data().dislike + 1;
        db.collection('posts')
          .doc(pid)
          .update({
            dislike: dislike
          });
      })
      .then(dispatch({ type: 'DISLIKE_POST', pid }))
      .catch(err => dispatch({ type: 'DISLIKE_POST_ERR', err }));
  };
};
