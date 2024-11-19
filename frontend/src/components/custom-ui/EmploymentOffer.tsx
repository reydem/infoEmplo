// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/custom-ui/EmploymentOffer.tsx
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
    <div className="border-gray-400 border-t-4 h-24 my-0">
      <div className="mx-auto flex mt-3  max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 ">
        <Button 
        color="white"
        className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300"
        style={{ '--btn-icon': 'rgb(0, 0, 0)' } as React.CSSProperties} // Cambia a negro        
        >
        <BriefcaseIcon
            aria-hidden="true"
            className="w-6 h-6 text-black"
            strokeWidth={2.5} // Ajusta el grosor del trazo
          />
          {buttonText}
        </Button>
      </div>
      <div className="mx-auto flex  max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 text-xs leading-tight mt-2 font-bold">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default EmploymentOffer;
