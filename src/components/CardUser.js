import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    IconButton,
    Button
  } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
   
  export default function Example(props) {
    const { user,deleteUser } = props;
    const navigate = useNavigate();
 

    return (
      <Card className="w-96 gap-10 mb-10">
        <CardHeader color="blue" className="relative h-56">
          <img
            src={"https://www.maxpixel.net/static/photo/1x/Icon-Avatar-Person-Business-Male-Profile-User-5359553.png"}
            alt="img-blur-shadow"
            className="h-full w-full"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
          {user.firstname}
          </Typography>
          <Typography>
           {user.lastname}
          </Typography>
          <Typography>
           Email : {user.email}
          </Typography>
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <Typography variant="h2" color="gray" className="flex gap-4">
          <IconButton size="lg" color={"red"} onClick={() => deleteUser(user._id)}>
          <i className="fas fa-trash fa-lg" />
          </IconButton>
           {user.isAdmin}
          </Typography>
          <Button onClick={() => navigate(`/updateUser?id=${user._id}`)}>
            Modifie le profil
          </Button>
        </CardFooter>
      </Card>
    );
  }