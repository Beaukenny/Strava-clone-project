export const getAllPhotos = async (workout_id) => {
    const response = await fetch(`/api/pictures/${workout_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return await response.json();
  }


  export const addPhoto = async (formData, id) => {
    const response = await fetch(`/api/pictures/${id}`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",  //deleting this, browser will set boundary itself.
      //
      // },
      // author also used:  delete options.headers['Content-Type'];
      body: formData,
    });

    const resp = await response.json();
    console.log("returning response: ", resp);
    return resp; //await response.json();
  }
