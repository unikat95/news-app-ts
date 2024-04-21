export const handleOpenModal = (setIsModalOpen: (isOpen: boolean) => void) => {
  setIsModalOpen(true);
};

export const handleCloseModal = (setIsModalOpen: (isOpen: boolean) => void) => {
  setIsModalOpen(false);
};

export const handleOpenDropdown = (
  setOpenDropdown: (isOpen: boolean) => void,
  isOpen: boolean
) => {
  setOpenDropdown(!isOpen);
};

export const handleCloseDropdown = (
  setOpenDropdown: (isOpen: boolean) => void
) => {
  setOpenDropdown(false);
};
