import { Card, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

function ContactCard({ contact }) {
    const { created_at, first_name, id, last_name, phones } = contact;
    // const navigate = useNavigate();

    // const onClickDetail = () => {
    //     navigate(`${id}/detail`);
    // };

    const list_phone = phones.map(e => (e.number))

    return (
        <Card>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent={'space-between'} alignItems="center">
                        <Grid item>
                            <Stack>
                                <Typography variant="h4">{first_name}</Typography>
                                <Typography variant="caption">{last_name}</Typography>
                            </Stack>
                        </Grid>
                        {/* <Grid item xs={'auto'}>
                            {status === INTERVIEW_STATUS.EXPIRED ? (
                                <IconButton size="small" color="error">
                                    <IconTrash size={18} />
                                </IconButton>
                            ) : (
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <StarIcon size={24} sx={{ color: '#FFB054' }} />
                                    <Typography variant="body1">{rating || 0}</Typography>
                                </Stack>
                            )}
                        </Grid> */}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={1.5}>
                        <Grid item>
                            <Typography variant="h4">{list_phone}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}

export default ContactCard;
