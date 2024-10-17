import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image từ next/image

import LoadingModal from "@/app/components/modals/LoadingModal";

interface BotBoxProps {
  data: {
    id: string,
    name: string,
    image: string,
    isActive?: boolean // Thêm biến `isActive` để kiểm tra trạng thái hoạt động của người dùng
  }
}

const BotBox: React.FC<BotBoxProps> = ({ 
  data
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios.post('/api/conversations', { userId: data.id })
    .then((response) => {
      router.push(`/conversations/${response.data.id}`);
    })
    .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && (
        <LoadingModal />
      )}
      <div
        onClick={handleClick}
        className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        "
      >
        <div className="relative">
          <div className="
            relative 
            inline-block 
            rounded-full 
            overflow-hidden
            h-9 
            w-9 
            md:h-11 
            md:w-11
          ">
            <Image
              fill
              src={data?.image || '/images/placeholder.jpg'}
              alt="Avatar"
              className="object-cover"
            />
          </div>
          <span 
              className="
                absolute 
                block 
                rounded-full 
                bg-green-500 
                ring-2 
                ring-white 
                top-0 
                right-0
                h-2 
                w-2 
                md:h-3 
                md:w-3
              " 
            />
        </div>
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BotBox;
