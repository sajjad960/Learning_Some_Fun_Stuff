const signup = (req: Request, res: Response, next: NextFunction) => {
  // Otp Validation

  // User Data Creation
  // Helping Variables
  let user: any;
  let client: any;
  let roles: any;
  new Promise(function (resolve, reject) {
    const newUser = Users.create({
      phone: req.body.phone,
      password: "client",
    });

    resolve(newUser);
  })
    .catch((err) => {
      return { err: err, type: "user" };
    })
    .then(function (data: any) {
      if (data?.err) {
        next(data.err);
      } else {
        // add user for next usecase
        user = data;

        return new Promise(function (resolve, reject) {
          const newClient = Client.create({
            user_id: data.id,
          });
          resolve(newClient);
        });
      }
    })
    .catch((err) => {
      return { err: err, type: "client" };
    })
    .then(function (data: any) {
      if (data?.err && data?.type === "client") {
        // Delete Created User , Coz Client Fail To Create
        if (user?.id) {
          new Promise(function (resolve, reject) {
            const deleteUser = Users.destroy({ where: { id: user?.id } });
          });
        }
        next(data.err);
      } else {
        // set client for next usecase
        client = data;

        // Create Roles For This User
        return new Promise(function (resolve, reject) {
          const newRoles = modelHasRoles.create({
            role_id: 7,
            model_type: "App/Models/User",
            model_id: user?.id,
          });
          resolve(newRoles);
        });
      }
    })
    .catch((err) => {
      return { err: err, type: "roles" };
    })
    .then(function (data: any) {
      if (data?.err && data?.type === "roles") {
        // Delete Created User and Created Clent , Coz Role Faile To Create

        if (user?.id && client?.id) {
          new Promise(function (resolve, reject) {
            const deleteUser = Users.destroy({ where: { id: user?.id } });
            const deleteClient = Client.destroy({ where: { id: client?.id } });
          });
        }

        next(data.err);
      } else {
        // Add Role For Next Usecase
        roles = data;

        //create token
        createSendToken(user, roles, 201, req, res);
      }
    });
};
