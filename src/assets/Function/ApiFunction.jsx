import axios from "axios"

export const api = axios.create({
    baseURL :"http://localhost:8080",
    withCredentials: true
})


export async function getAllWithPaginate() {
    try {
        const response = await api.get("/movie/all")
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getMovieByGenre(genre, type) {
    try {
        // console.log(id)
        const response = await api.get(`/movie/all`, {
            params: {
                genre: genre,
                type: type
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getMovieAdvance(choice, type) {
    try {
        // console.log(id)
        const response = await api.get(`/movie/advanced`, {
            params: {
                choice: choice,
                type: type
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getFavoriteByUser (user_id) {
    try {
        // console.log(id)
        const response = await api.get(`/movie/all/user`, {
            params: {
                user_id: user_id
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getWatchedByUser(user_id) {
    try {
        // console.log(id)
        const response = await api.get(`/movie/watched/user`, {
            params: {
                user_id: user_id
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getMovieDetails(id) {
    try {
        // console.log(id)
        const response = await api.get(`/movie/details`, {
            params: {
                id: id
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function updateFavorite(movieID, userID) {
    try {
        const response = await api.get(`/movie/favorite`, {
            params: {
                movie_id: movieID,
                user_id: userID
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function checkFavorite(movieID, userID) {
    try {
        const response = await api.get(`/movie/favorite-user`, {
            params: {
                movie_id: movieID,
                user_id: userID
            }
        })
        return response
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function updateView(movieID, userID) {
    try {
        const response = await api.get(`/movie/view`, {
            params: {
                movie_id: movieID,
                user_id: userID
            }
        })
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}
export async function getActorDetail(id) {
    try {
        // console.log(id)
        const response = await api.get(`/people/actor`, {
            params: {
                id: id
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getMoviesByRated() {
    try {
        // console.log(id)
        const response = await api.get(`/movie/movie-trailer-limit`)
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getAllGenre() {
    try {
        // console.log(id)
        const response = await api.get(`/genre/all`)
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
// lấy các comments của movie với movie_id
export async function getCommentsByMovieID(movie_id) {
    try {
        const response = await api.get(`/comment/movie`, {
            params: {
                id: movie_id
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
// post comment
export async function postComment(movie_id, user_id, tag_id, comment) {
    try {
        const response = await api.post(`/comment/add`, {
            movie_id: movie_id,
            user_id: user_id,
            tag_id: tag_id,
            comment: comment
        });
        return response.data;
    } catch (error) {
        throw new Error("Error posting comment");
    }
}
// post evaluate
export async function postEvaluate(movie_id, user_id, evaluate) {
    try {
        const response = await api.post(`/evaluate/add`, {
            movie_id: movie_id,
            user_id: user_id,
            evaluate: evaluate
        });
        return response.data;
    } catch (error) {
        throw new Error("Error posting comment");
    }
}

