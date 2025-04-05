import yup from '@/plugins/yup';

export const PasswordFieldAddOrUpdate = yup.object({
  email: yup.string().required().min(3).max(255).trim(),
  password: yup.string().required().min(3).max(255).trim(),
  service: yup.string().required().min(3).max(255).trim(),
});
