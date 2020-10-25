import * as React from 'react';
import { FC } from 'react';
import DollarIcon from '@material-ui/icons/AttachMoney';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

interface Props {
    value?: string;
}

const MonthlyRevenue: FC<Props> = ({ value }) => {
    // const translate = useTranslate();
    console.log(value);
    return (
        <CardWithIcon
            to="/commands"
            icon={DollarIcon}
            title={'本月讲解次数'}
            subtitle={value?.slice(1)}
        />
    );
};

export default MonthlyRevenue;
