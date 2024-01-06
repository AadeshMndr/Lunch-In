import { AnimatePresence } from "framer-motion";

import DeletionModal from "./DeletionModal";
import { Review } from "@/models/Review";
import { Meal } from "@/models/Meal";

interface Props {
  deleteModalIsOpen: boolean;
  selectedForDeletion: string[];
  data: Meal[] |  Review[] | undefined;
  onCancel: () => void;
  onDelete: () => void;
}

const DeletionLayer: React.FC<Props> = ({
  deleteModalIsOpen,
  selectedForDeletion,
  onCancel: cancelDeletion,
  onDelete: confirmDeletion,
  data,
}) => {
  return (
    <AnimatePresence>
      {deleteModalIsOpen && (
        <DeletionModal
          deletionItems={data?.filter(({ id }) => selectedForDeletion.includes(id)) as (Meal[] | Review[]) || []}
          onCancel={cancelDeletion}
          onDelete={confirmDeletion}
        />
      )}
    </AnimatePresence>
  );
};

export default DeletionLayer;
