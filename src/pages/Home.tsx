// import { useAuth } from '../contexts/AuthContext';
import { useAuthStore } from "@/store/authStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useProductStore } from "@/store/productStore";

const Home = () => {
  const { user } = useAuthStore();
  const { total } = useProductStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">
          Welcome back, {user?.firstName} {user?.lastName}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your admin panel today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl truncate" title={user?.email}>
              {user?.email}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">Active</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
