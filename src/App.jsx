import React, { useState } from 'react';
import {
  Camera,
  ChevronDown,
  ChevronLeft,
  CopyPlus,
  Edit3,
  FileText,
  Maximize2,
  Mic,
  PlusCircle,
  RefreshCw,
  Settings,
  Sparkles,
  Trash2,
  Undo2,
  Upload,
  User,
  Wand2,
  X,
} from 'lucide-react';

const App = () => {
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isVlmProcessing, setIsVlmProcessing] = useState(false);

  // 護理紀錄文字內容
  const [recordText, setRecordText] = useState(
    '病人主訴傷口疼痛，已給予止痛藥 500mg，持續觀察生命徵象與傷口變化。'
  );

  // 照片資料
  const [photos, setPhotos] = useState([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=800&fit=crop',
      desc: '右側手臂傷口，範圍約 3 x 3 cm，周圍輕微泛紅。',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=800&fit=crop',
      desc: '換藥後狀態穩定，敷料完整，無明顯滲液。',
    },
  ]);

  // VLM 彙整結果
  const [globalVlmText, setGlobalVlmText] = useState('');

  const handleDeletePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
    setDeleteConfirm(null);
  };

  const runGlobalVLM = () => {
    setIsVlmProcessing(true);

    setTimeout(() => {
      const combined = photos.map((photo) => `[照片 ${photo.id}]: ${photo.desc}`).join('\n');
      setGlobalVlmText(`AI 影像彙整結果：\n${combined}`);
      setIsVlmProcessing(false);
    }, 1500);
  };

  const appendToRecord = (text) => {
    setRecordText((prev) => `${prev}\n${text}`);
  };

  return (
    <div className="relative mx-auto flex h-screen max-w-[430px] flex-col overflow-hidden border-x border-slate-100 bg-white font-sans text-[#334155] shadow-2xl">
      {/* 頂部資訊列 */}
      <header className="z-20 flex items-center justify-between bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          {/* 返回按鈕 */}
          <button className="-ml-1 p-1 text-slate-400">
            <ChevronLeft className="h-7 w-7" />
          </button>

          {/* 照片入口與數量 */}
          <button
            onClick={() => setShowPhotoGallery(true)}
            className="relative rounded-2xl border border-blue-100 bg-blue-50 p-2.5 text-blue-500 shadow-sm transition-all active:scale-95"
          >
            <Camera className="h-5 w-5" />
            {photos.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white">
                {photos.length}
              </span>
            )}
          </button>

          <div className="ml-1 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-700">王小美</span>
              <div className="rounded bg-[#2563EB] px-1.5 py-0.5 text-[10px] font-bold text-white">
                10A-05
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-light text-slate-600">
            <RefreshCw className="h-3.5 w-3.5" /> 重新整理
          </button>
          <button className="rounded-2xl border border-slate-200 p-2.5 text-slate-400">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* 紀錄編輯區 */}
      <main className="relative flex flex-1 flex-col overflow-hidden px-4 py-2">
        <div className="mb-4 flex-1 overflow-y-auto rounded-[40px] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <textarea
            className="h-full w-full resize-none border-none bg-transparent text-xl font-light leading-[1.8] text-slate-600 outline-none"
            value={recordText}
            onChange={(e) => setRecordText(e.target.value)}
          />
        </div>

        {/* 底部操作列 */}
        <div className="pb-8">
          <div className="relative flex h-20 items-center justify-between rounded-[32px] border border-slate-100 bg-[#F8FAFC] p-2 px-2 shadow-inner">
            <div className="flex items-center gap-1.5">
              <button className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
                <div className="flex flex-col items-center">
                  <FileText className="h-6 w-6 text-slate-300" />
                  <ChevronDown className="-mt-0.5 h-3 w-3 text-slate-300" />
                </div>
              </button>
              <button className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
                <PlusCircle className="h-6 w-6 text-slate-300" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button className="rounded-2xl border border-slate-100 bg-white p-3 text-slate-300 shadow-sm">
                <Undo2 className="h-6 w-6" />
              </button>
              <button className="rounded-2xl border border-indigo-50 bg-[#EEF2FF] p-3 text-indigo-400 shadow-sm">
                <Sparkles className="h-6 w-6" />
              </button>
              <button className="rounded-2xl border border-emerald-50 bg-[#DCFCE7] p-3 text-emerald-500 shadow-sm">
                <Upload className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="relative z-10 -mt-9 flex justify-center">
            <button className="flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-white bg-[#EF4444] text-white shadow-[0_12px_30px_rgba(239,68,68,0.4)]">
              <Mic className="h-9 w-9 fill-current" />
            </button>
          </div>
        </div>
      </main>

      {/* 照片總覽彈窗 */}
      {showPhotoGallery && (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-6">
          <div
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]"
            onClick={() => setShowPhotoGallery(false)}
          />
          <div className="relative flex max-h-[85vh] w-full max-w-[400px] flex-col overflow-hidden rounded-[48px] bg-white shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">照片總覽</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={runGlobalVLM}
                    disabled={isVlmProcessing}
                    className="flex items-center gap-1.5 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 disabled:opacity-50"
                  >
                    {isVlmProcessing ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="h-4 w-4" />
                    )}
                    AI 影像彙整
                  </button>
                  <button
                    onClick={() => setShowPhotoGallery(false)}
                    className="rounded-2xl bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-md"
                  >
                    關閉
                  </button>
                </div>
              </div>

              {globalVlmText && (
                <div className="relative mb-6 rounded-3xl border border-slate-100 bg-slate-50 p-4 group">
                  <div className="mb-2 flex items-start justify-between">
                    <span className="flex items-center gap-1 text-xs font-bold text-indigo-500">
                      <Wand2 className="h-3 w-3" /> AI 建議摘要
                    </span>
                    <button
                      onClick={() => appendToRecord(globalVlmText)}
                      className="rounded-full bg-indigo-500 px-2 py-0.5 text-[11px] text-white shadow-sm"
                    >
                      加入紀錄
                    </button>
                  </div>
                  <textarea
                    className="w-full resize-none border-none bg-transparent text-sm leading-relaxed text-slate-600 outline-none"
                    rows="3"
                    value={globalVlmText}
                    onChange={(e) => setGlobalVlmText(e.target.value)}
                  />
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <button className="flex aspect-square flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-slate-100 bg-slate-50 text-slate-300 hover:bg-slate-100">
                  <Camera className="h-6 w-6" />
                  <span className="mt-1 text-[10px] font-medium">拍照</span>
                </button>
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative aspect-square overflow-hidden rounded-[28px] border border-slate-50 bg-slate-100 shadow-sm"
                  >
                    <img src={photo.url} alt="clinical" className="h-full w-full object-cover" />
                    <button
                      onClick={() => setSelectedPhoto(photo)}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Maximize2 className="h-6 w-6 text-white" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(photo.id)}
                      className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md"
                    >
                      <X className="h-3.5 w-3.5 stroke-[3]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 單張照片詳情 */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-black animate-in fade-in duration-200">
          <div className="z-10 flex items-center justify-between p-4">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="rounded-full bg-white/10 p-2 text-white backdrop-blur-md"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                <Wand2 className="h-4 w-4" /> VLM 分析圖片
              </button>
              <button
                onClick={() => {
                  appendToRecord(selectedPhoto.desc);
                  setSelectedPhoto(null);
                }}
                className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm text-white shadow-lg shadow-blue-500/20"
              >
                <CopyPlus className="h-4 w-4" /> 加入紀錄
              </button>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center px-2">
            <img
              src={selectedPhoto.url}
              alt="full"
              className="max-h-[70vh] max-w-full rounded-lg object-contain"
            />
          </div>

          <div className="bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 pb-12">
            <div className="mx-auto max-w-[430px]">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <div className="font-bold text-white">護理照片描述</div>
                  <div className="text-xs text-white/50">2026/05/08 10:26</div>
                </div>
              </div>
              <div className="group relative">
                <textarea
                  className="w-full resize-none rounded-lg border-none bg-transparent p-2 text-base leading-relaxed text-white outline-none transition-all focus:bg-white/5"
                  rows="3"
                  value={selectedPhoto.desc}
                  onChange={(e) => {
                    const newPhotos = photos.map((photo) =>
                      photo.id === selectedPhoto.id ? { ...photo, desc: e.target.value } : photo
                    );
                    setPhotos(newPhotos);
                    setSelectedPhoto({ ...selectedPhoto, desc: e.target.value });
                  }}
                />
                <div className="pointer-events-none absolute right-2 top-2 opacity-30 transition-opacity group-hover:opacity-100">
                  <Edit3 className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 刪除確認彈窗 */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-8">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative w-full max-w-[280px] rounded-[32px] bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
              <Trash2 className="h-6 w-6 text-red-500" />
            </div>
            <h4 className="mb-2 text-lg font-bold text-slate-800">確定要刪除這張照片嗎？</h4>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-2xl bg-slate-100 py-3 text-sm font-bold text-slate-600"
              >
                取消
              </button>
              <button
                onClick={() => handleDeletePhoto(deleteConfirm)}
                className="flex-1 rounded-2xl bg-red-500 py-3 text-sm font-bold text-white shadow-lg"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
