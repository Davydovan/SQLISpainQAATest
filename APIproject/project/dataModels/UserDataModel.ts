export class UserDataModel {
  id!: number;

  username!: string;

  firstName!: string;

  lastName!: string;

  email!: string;

  password!: string;

  phone: string | undefined;

  userStatus: number | undefined;

  constructor(
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone?: string | undefined,
    userStatus?: number | undefined
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.userStatus = userStatus;
  }

  /**
   * Serialize the object to JSON.
   * @returns {string} The JSON string representation of the object.
   */
  serialize() {
    return JSON.stringify(this);
  }

  /**
   * Deserialize JSON to an UserDataModel object.
   * @param {string} json - The JSON string to deserialize.
   * @returns {UserDataModel} The deserialized UserDataModel object.
   */
  static deserialize(json: any) {
    const data = JSON.parse(json);
    return new UserDataModel(
      data.id,
      data.username,
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.phone,
      data.userStatus
    );
  }
}
