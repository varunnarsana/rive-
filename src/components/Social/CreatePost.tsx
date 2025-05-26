import styled from 'styled-components';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CreatePostButton = styled.button`
  background: linear-gradient(to right, #8E6B9E, #4A3858);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(142, 107, 158, 0.3);
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  
  &:hover {
    color: #333;
  }
`;

const ImageUploadArea = styled.div<{ $isDragging: boolean }>`
  border: 2px dashed ${props => props.$isDragging ? '#8E6B9E' : '#ddd'};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$isDragging ? 'rgba(142, 107, 158, 0.1)' : 'transparent'};

  &:hover {
    border-color: #8E6B9E;
    background: rgba(142, 107, 158, 0.1);
  }
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 12px;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: #8E6B9E;
  }
`;

const TagInput = styled(Input)`
  margin-bottom: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background: rgba(142, 107, 158, 0.1);
  color: #8E6B9E;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    font-size: 1rem;
  }
`;

const PostButton = styled.button`
  background: linear-gradient(to right, #8E6B9E, #4A3858);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(142, 107, 158, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

interface CreatePostProps {
  onPost: (post: {
    image: string;
    caption: string;
    tags: string[];
  }) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/\s+/g, '');
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (image && caption) {
      onPost({
        image,
        caption,
        tags
      });
      setIsOpen(false);
      setImage(null);
      setCaption('');
      setTags([]);
    }
  };

  return (
    <>
      <CreatePostButton onClick={() => setIsOpen(true)}>
        <i className="fas fa-plus"></i>
        Create Post
      </CreatePostButton>

      <AnimatePresence>
        {isOpen && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <ModalContent
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileSelect}
              />

              {!image ? (
                <ImageUploadArea
                  $isDragging={isDragging}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <i className="fas fa-cloud-upload-alt" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#8E6B9E' }}></i>
                  <p>Drag and drop an image here, or click to select</p>
                </ImageUploadArea>
              ) : (
                <PreviewImage src={image} alt="Preview" />
              )}

              <Input
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />

              <TagInput
                placeholder="Add tags (press Enter)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagAdd}
              />

              <TagsContainer>
                {tags.map(tag => (
                  <Tag key={tag}>
                    #{tag}
                    <button onClick={() => handleTagRemove(tag)}>×</button>
                  </Tag>
                ))}
              </TagsContainer>

              <PostButton
                onClick={handleSubmit}
                disabled={!image || !caption}
              >
                Post
              </PostButton>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}; 