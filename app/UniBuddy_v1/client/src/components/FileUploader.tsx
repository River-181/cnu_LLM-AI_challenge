import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  FileText, 
  Mic, 
  CheckCircle, 
  AlertCircle,
  X
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface FileUploadProps {
  onUploadComplete?: () => void;
}

interface UploadFile {
  file: File;
  id: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

export function FileUploader({ onUploadComplete }: FileUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async ({ file, title, subject }: { file: File; title: string; subject: string }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('subject', subject);

      return apiRequest('/api/lectures/upload', {
        method: 'POST',
        body: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/lectures'] });
      onUploadComplete?.();
      setFiles([]);
      setTitle('');
      setSubject('');
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: 'pending' as const,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'audio/mpeg': ['.mp3'],
      'audio/wav': ['.wav'],
      'audio/mp4': ['.m4a'],
      'audio/aac': ['.aac'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: true,
  });

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.includes('audio')) return <Mic className="w-5 h-5 text-purple-500" />;
    return <FileText className="w-5 h-5 text-blue-500" />;
  };

  const getFileTypeLabel = (file: File) => {
    if (file.type.includes('pdf')) return 'PDF';
    if (file.type.includes('presentation') || file.name.endsWith('.ppt') || file.name.endsWith('.pptx')) return 'PPT';
    if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) return 'DOCX';
    if (file.type.includes('audio')) return '오디오';
    return '기타';
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleUpload = async () => {
    if (!files.length || !title.trim()) return;

    const file = files[0]; // For simplicity, upload one file at a time
    
    setFiles(prev => prev.map(f => 
      f.id === file.id ? { ...f, status: 'uploading', progress: 0 } : f
    ));

    try {
      await uploadMutation.mutateAsync({ 
        file: file.file, 
        title: title.trim(), 
        subject: subject.trim() || '기타' 
      });
      
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'completed', progress: 100 } : f
      ));
    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { 
          ...f, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Upload failed' 
        } : f
      ));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-25'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">강의 자료를 업로드하세요</h3>
            <p className="text-gray-500 mb-4">PPT, PDF, 오디오 파일 (MP3, M4A, WAV)을 지원합니다</p>
            <div className="flex justify-center space-x-4 text-sm">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800">
                <FileText className="w-4 h-4 mr-2" />
                PPT
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800">
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                <Mic className="w-4 h-4 mr-2" />
                오디오
              </span>
            </div>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            파일 선택하기
          </Button>
        </div>
      </div>

      {/* File List and Details */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">강의 제목 *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="예: 데이터베이스 개론 - 3주차"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">과목명</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="예: 컴퓨터과학"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">업로드된 파일들</h4>
                {files.map(fileItem => (
                  <div key={fileItem.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    {getFileIcon(fileItem.file)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{fileItem.file.name}</p>
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                          {getFileTypeLabel(fileItem.file)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{formatFileSize(fileItem.file.size)}</p>
                      {fileItem.status === 'uploading' && (
                        <Progress value={fileItem.progress} className="mt-2 h-1" />
                      )}
                      {fileItem.error && (
                        <p className="text-xs text-red-500 mt-1">{fileItem.error}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {fileItem.status === 'completed' && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      {fileItem.status === 'error' && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      {fileItem.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(fileItem.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <Button
                  onClick={handleUpload}
                  disabled={!title.trim() || files.length === 0 || uploadMutation.isPending}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {uploadMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      업로드 중...
                    </div>
                  ) : (
                    '강의 업로드 및 분석 시작'
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
