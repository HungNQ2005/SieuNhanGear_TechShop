import React from 'react';
import { Text } from 'react-native';
import { useLocalization } from '../providers/LocalizationProvider';

export default function TextIntl({ tx, params, style, className, children, ...rest }) {
  const { t } = useLocalization();
  const content = tx ? t(tx, params) : children;

  return (
    <Text style={style} {...rest}>
      {content}
    </Text>
  );
}
