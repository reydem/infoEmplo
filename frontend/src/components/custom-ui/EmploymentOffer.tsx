import React from 'react';
import { Button } from '../ui';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

interface EmploymentOfferProps {
  buttonText?: string;
  description: string;
}

const EmploymentOffer: React.FC<EmploymentOfferProps> = ({
  buttonText = "Oferta de empleo",
  description,
}) => {
  return (
    <div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Button color="white" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
          <BriefcaseIcon aria-hidden="true" className="size-6" />
          {buttonText}
        </Button>
      </div>
      <div className="mx-auto flex h-2 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default EmploymentOffer;
