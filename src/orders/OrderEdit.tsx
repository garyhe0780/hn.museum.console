import * as React from 'react';
import { FC } from 'react';
import {
    BooleanInput,
    DateField,
    Edit,
    EditProps,
    FormWithRedirect,
    Labeled,
    ReferenceField,
    SelectInput,
    TextField,
    Toolbar,
    useTranslate,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardContent,
    Box,
    Grid,
    Typography,
    Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Order, Customer } from '../types';
import Basket from './Basket';
import Totals from './Totals';

interface OrderTitleProps {
    record?: Order;
}

const OrderTitle: FC<OrderTitleProps> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.commands.title', {
                reference: record.reference,
            })}
        </span>
    ) : null;
};

const CustomerDetails = ({ record }: { record?: Customer }) => (
    <Box display="flex" flexDirection="column">
        <Typography
            component={RouterLink}
            color="primary"
            to={`/customers/${record?.id}`}
            style={{ textDecoration: 'none' }}
        >
            {record?.first_name} {record?.last_name}
        </Typography>
    </Box>
);

const CustomerAddress = ({ record }: { record?: Customer }) => (
    <Box>
        <Typography>
            {record?.first_name} {record?.last_name}
        </Typography>
        <Typography>{record?.address}</Typography>
        <Typography>
            {record?.city}, {record?.stateAbbr} {record?.zipcode}
        </Typography>
    </Box>
);

const useEditStyles = makeStyles({
    root: { alignItems: 'flex-start' },
});

const Spacer = () => <Box m={1}>&nbsp;</Box>;

const OrderForm = (props: any) => {
    const translate = useTranslate();
    return (
        <FormWithRedirect
            {...props}
            render={(formProps: any) => (
                <Box maxWidth="50em">
                    <Card>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={8}>
                                    <Typography variant="h6" gutterBottom>
                                        讲解详情
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Labeled
                                                source="date"
                                                resource="commands"
                                            >
                                                <DateField
                                                    source="date"
                                                    resource="commands"
                                                    record={formProps.record}
                                                />
                                            </Labeled>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <SelectInput
                                                resource="commands"
                                                source="status"
                                                choices={[
                                                    {
                                                        id: 'delivered',
                                                        name: '讲解完成',
                                                    },
                                                    {
                                                        id: 'cancelled',
                                                        name: '讲解未完成',
                                                    },
                                                ]}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Box mt={2}>
                                                <BooleanInput
                                                    row={true}
                                                    resource="commands"
                                                    source="是否签到"
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Typography variant="h6" gutterBottom>
                                    志愿者
                                    </Typography>
                                    <ReferenceField
                                        source="customer_id"
                                        resource="commands"
                                        reference="customers"
                                        basePath="/customers"
                                        record={formProps.record}
                                        link={false}
                                    >
                                        <CustomerDetails />
                                    </ReferenceField>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            )}
        />
    );
};
const OrderEdit: FC<EditProps> = props => {
    const classes = useEditStyles();
    return (
        <Edit
            title={<OrderTitle />}
            classes={classes}
            {...props}
            component="div"
        >
            <OrderForm />
        </Edit>
    );
};

export default OrderEdit;
