import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Message.scss";

import {
  // QueryClient,
  // QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import NewRequest from "../../utilis/NewRequest";
import { useAuth } from "../../utilis/AuthContext";

const Message = () => {

  const {id} = useParams()

  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  // eslint-disable-next-line 
  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn: () => 
      NewRequest.get(`/messages/${id}`).then((res => {
        return res.data
      }))
    
  })

  console.log("sender: " , data)
  console.log("current user: " , currentUser._id)

  const mutation = useMutation({
    mutationFn: (message) => {
      return NewRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> 
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;