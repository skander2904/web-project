import { useEffect, useState } from "react";
import { getallUsers, updateUser } from "../service/service";
import { CiSearch } from "react-icons/ci";

const AdminEditUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersData = await getallUsers();
      console.log("Fetched data:", usersData);

      if (Array.isArray(usersData.users)) {
        setUsers(usersData.users);
      } else {
        throw new Error("Fetched data is not in the expected format.");
      }
    } catch (err) {
      setError("Failed to load users: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );

      const userToUpdate = users.find((user) => user._id === userId);
      if (userToUpdate) {
        const updatedUser = { ...userToUpdate, status: newStatus };

        const response = await updateUser(userId,updatedUser);
        fetchUsers();
     
      }
    } catch (err) {
      console.error("Failed to update user status:", err.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: user.status } : user
        )
      );
      setError("Error updating status: " + err.message); 
    }
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.role !== "admin" && 
        (user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ) );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4 w-full relative">
      <div className="sticky top-0 z-10">
        <div className="header flex justify-between items-center p-4 bg-white">
          <h1>User Table</h1>
          <div className="search flex justify-between items-center px-5 py-2 bg-gray-100 rounded">
            <input
              type="text"
              placeholder="Search user"
              className="bg-transparent outline-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <CiSearch />
          </div>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md mt-14">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="px-4 py-2 font-semibold text-gray-700">UserName</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Email</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Age</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Role</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="px-4 py-2">{user.userName}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.age}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <select
                  value={user.status}
                  onChange={(e) => handleStatusChange(user._id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="Active">Active</option>
                  <option value="banned">Banned</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEditUsers;
