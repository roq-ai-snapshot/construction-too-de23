import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getLogisticsById, updateLogisticsById } from 'apiSdk/logistics';
import { logisticsValidationSchema } from 'validationSchema/logistics';
import { LogisticsInterface } from 'interfaces/logistics';
import { RentalInterface } from 'interfaces/rental';
import { getRentals } from 'apiSdk/rentals';

function LogisticsEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<LogisticsInterface>(
    () => (id ? `/logistics/${id}` : null),
    () => getLogisticsById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: LogisticsInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateLogisticsById(id, values);
      mutate(updated);
      resetForm();
      router.push('/logistics');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<LogisticsInterface>({
    initialValues: data,
    validationSchema: logisticsValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Logistics',
              link: '/logistics',
            },
            {
              label: 'Update Logistics',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Logistics
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="delivery_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Delivery Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.delivery_date ? new Date(formik.values?.delivery_date) : null}
              onChange={(value: Date) => formik.setFieldValue('delivery_date', value)}
            />
          </FormControl>
          <FormControl id="return_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Return Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.return_date ? new Date(formik.values?.return_date) : null}
              onChange={(value: Date) => formik.setFieldValue('return_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.delivery_address}
            label={'Delivery Address'}
            props={{
              name: 'delivery_address',
              placeholder: 'Delivery Address',
              value: formik.values?.delivery_address,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.return_address}
            label={'Return Address'}
            props={{
              name: 'return_address',
              placeholder: 'Return Address',
              value: formik.values?.return_address,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<RentalInterface>
            formik={formik}
            name={'rental_id'}
            label={'Select Rental'}
            placeholder={'Select Rental'}
            fetcher={getRentals}
            labelField={'start_date'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/logistics')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'logistics',
    operation: AccessOperationEnum.UPDATE,
  }),
)(LogisticsEditPage);
