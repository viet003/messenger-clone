'use client';

import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm 
} from 'react-hook-form';
import { User } from '@prisma/client';

import Input from "../inputs/Input";
import Select from '../inputs/Select';
import Modal from './Modal';
import Button from '../Button';
import { toast } from 'react-hot-toast';
import Botconfig from '@/app/users/components/Botconfig';

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({ 
  isOpen, 
  onClose, 
  users = []
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: []
    }
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
  
    axios.post('/api/conversations', {
      ...data,
      isGroup: true
    })
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => toast.error('Something went wrong!'))
    .finally(() => setIsLoading(false));
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 
              className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
              "
              >
                Tạo nhóm chat mới
              </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Tạo đoạn chat với nhiều hơn 2 người.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Tên nhóm chat" 
                id="name" 
                errors={errors} 
                required 
                register={register}
              />
              <Select
                disabled={isLoading}
                label="Thành viên" 
                options={users
                  .filter(user => user.id !== Botconfig.id) // Filter out bot users
                  .map(user => ({ 
                    value: user.id, 
                    label: user.name 
                  }))
                }                
                onChange={(value) => setValue('members', value, { 
                  shouldValidate: true 
                })} 
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            onClick={onClose} 
            type="button"
            secondary
          >
            Đóng
          </Button>
          <Button disabled={isLoading} type="submit">
            Tạo nhóm chat
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default GroupChatModal;
