import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";

function ListUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const awsConfig = {
      accessKeyId: "", // Replace with your AWS access key
      secretAccessKey: "", // Replace with your AWS secret key
      region: "us-east-1", // Replace with your AWS region
    };

    AWS.config.update(awsConfig);

    const cognito = new AWS.CognitoIdentityServiceProvider();

    // Replace 'YourUserPoolId' with your actual User Pool ID
    const userPoolId = "";

    const params = {
      UserPoolId: userPoolId,
      // AttributesToGet: ["email"], //CAn mention the attributes required to fetch
    };

    cognito.listUsers(params, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        setUsers(data.Users);
      }
    });
  }, []);

  return (
    <div>
      <h2>Found Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.Username}>
            {user.Username}
            {user["Attributes"].map((attribute) => (
              <ul key={attribute.Name}>
                <li>
                  {" "}
                  {attribute.Name}-{attribute.Value}
                </li>
              </ul>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListUsers;
