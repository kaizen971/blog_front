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
import { durationReading } from "../utils/durationDate";
  export default function Example(props) {
    const { article } = props;
    const navigate = useNavigate();
    return (
      <Card className="w-96 gap-10 mb-10">

        <CardHeader color="blue" className="relative h-56">

          <img
            src={process.env.REACT_APP_API_URL + `/image/${article.photo.filename}`}
            alt="img-blur-shadow"
            className="h-full w-full"
          />
        </CardHeader>
        <CardBody className="text-center">
        <Typography >
           {`Temps de lecture : ${durationReading(article.description)}`}
          </Typography>
          <Typography variant="h5" className="mb-2">
          {article.title}
          </Typography>
          <Typography truncate textOverflow="ellipsis" style={{ lineHeight: 1, maxHeight: '2.5em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
           {article.description}
          </Typography>
          <Typography>
           Categorie : {article.category}
          </Typography>
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <Typography variant="h2" color="gray" className="flex gap-4">
          <IconButton size="lg">
          <i className="fas fa-heart fa-lg" />
          </IconButton>
           {article.like}
          </Typography>
          <Button onClick={() => navigate(`/articleDetail?id=${article._id}`)}>
            Voir
          </Button>
          <Typography variant="h2" color="gray" className="flex gap-4">
          <IconButton size="lg" color="red">
          <i className="fas fa-comment fa-lg" />
          </IconButton>
          {article.comment.length}

          </Typography>
        </CardFooter>
      </Card>
    );
  }