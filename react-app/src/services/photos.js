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
    //no headers needed for formData
    const response = await fetch(`/api/pictures/${id}`, {
      method: "POST",
      body: formData,
    });

    const resp = await response.json();
    return resp;
  }
