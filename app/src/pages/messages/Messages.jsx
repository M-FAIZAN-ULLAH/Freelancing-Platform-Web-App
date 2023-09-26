import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";

import {
  // QueryClient,
  // QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import NewRequest from "../../utilis/NewRequest";
import { useAuth } from "../../utilis/AuthContext";

import moment from "moment"
  

const Messages = () => {

  
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  // eslint-disable-next-line 
  const { isLoading, error, data } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => 
      NewRequest.get(`/conversations`).then((res => {
        return res.data
      }))
    
  })

  // const getUser = async (id) => {
  //   try {
  //     const user = await NewRequest.get(`/users/${id}`);
  //     return user.data.username; // Access the username property of the response
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const { data: userData } = useQuery({
  //   queryKey: ["usersname", currentUser.isSeller ? c.buyerId : c.sellerId],
  //   queryFn: () => {
  //     NewRequest.get(`/users/${id}`).then((res => {
  //       return res.data
  //     }))
  //   },
  //   enabled: Boolean(currentUser), // Only fetch when currentUser is available
  // });

  const [usernames, setUsernames] = useState({});

  // Function to fetch and store usernames
  const fetchAndStoreUsernames = async (userIds) => {
    const usernameMap = {};

    // Fetch usernames for each user ID
    for (const userId of userIds) {
      try {
        const user = await NewRequest.get(`/users/${userId}`);
        // Assuming your API returns the username in 'username' field
        usernameMap[userId] = user.data.username;
      } catch (error) {
        console.log(error);
        // Handle errors as needed
      }
    }

    // Set the usernames in state
    setUsernames(usernameMap);
  };

  useEffect(() => {
    // Extract unique user IDs from 'data' and convert them to an array
    const userIds = [...new Set(data.map((c) => (currentUser.isSeller ? c.buyerId : c.sellerId)))];

    // Fetch and store usernames for the unique user IDs
    fetchAndStoreUsernames(userIds);
  }, [data, currentUser]);

  const mutation = useMutation({
    mutationFn: (id) => {
      return NewRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };


  console.log("User info : ", currentUser)
  console.log("conservation info : ", data)

  return (
    <div className="messages">
      { isLoading ? ("Loading..." ) : error ? ("Something went wrong") : (
       <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <tr>
            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
              {data.map((c) => (
              <tr
                className={
                  ((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) &&
                  "active"
                }
                key={c.id}
              >
                 <td>
                    {/* Display the username based on current user type */}
                    {currentUser.isSeller
                      ? usernames[c.buyerId]
                      : usernames[c.sellerId]}
                  </td>
                {/* <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td> */}
                {/* <td>{currentUser.isSeller ? getUser(c.buyerId) : getUser(c.sellerId)}</td> */}
                <td>
                  <Link to={`/message/${c.id}`} className="link">
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) && (
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </table>   
      </div>)}
    </div>
  );
};

export default Messages;