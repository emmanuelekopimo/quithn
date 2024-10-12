import { useRouter } from 'next/router';

const RedirectToGoogleForm = () => {
  const router = useRouter();
  const { id } = router.query;
  if (id) {
    window.location.href = `https://docs.google.com/forms/d/${id}/viewform`;
  }
  return <p>Redirecting to Google Forms ...</p>;
};

export default RedirectToGoogleForm;
