# 🔄 Git Workflow ve Versiyon Yönetimi

Bu doküman, proje geliştirme sürecinde kullanılacak Git stratejisini açıklar.

## 📋 Branch Stratejisi

### Ana Branch'ler

```
main (production)
  └── develop (development)
       ├── feature/phase-1-critical-fixes
       ├── feature/phase-2-state-management
       ├── feature/phase-3-categories
       ├── feature/phase-4-performance
       ├── feature/phase-5-ui-ux
       └── feature/phase-6-extras
```

### Branch İsimlendirme

```bash
# Feature branch
feature/phase-1-critical-fixes
feature/phase-2-state-management

# Hotfix branch
hotfix/tailwind-config
hotfix/navbar-mobile

# Release branch
release/v1.0.0
```

---

## 🚀 Phase-by-Phase Git Workflow

### Phase 1 Başlangıç

```bash
# Main branch'i güncelle
git checkout main
git pull origin main

# Develop branch oluştur (ilk kez)
git checkout -b develop

# Phase 1 feature branch
git checkout -b feature/phase-1-critical-fixes

# Şimdi RFC-001 ve RFC-002'yi uygula
```

### Checkpoint 1.1: Tailwind Config

```bash
# RFC-001 implementasyonu
# Dosyaları düzenle...

# Değişiklikleri stage'e al
git add tailwind.config.js
git add src/app/layout.js
git add src/app/page.js
git add src/app/globals.css

# Commit
git commit -m "feat: configure tailwind and heroui provider

- Add content paths to tailwind.config.js
- Add HeroUIProvider to root layout
- Fix grid-cols-7 syntax error
- Fix dark mode media query

Implements: RFC-001"

# Test et
npm run dev

# Her şey OK ise push
git push origin feature/phase-1-critical-fixes
```

### Checkpoint 1.2: Error Handling

```bash
# RFC-002 implementasyonu
mkdir src/hooks
mkdir -p src/components

# Dosyaları oluştur...

git add src/hooks/useFetch.js
git add src/components/loading.jsx
git add src/components/error-message.jsx
git add src/components/product-skeleton.jsx
git add src/app/page.js

git commit -m "feat: add error handling and loading states

- Create useFetch custom hook with error handling
- Add Loading, ErrorMessage, and ProductSkeleton components
- Update home page to use new error handling
- Add retry functionality

Implements: RFC-002"

git push origin feature/phase-1-critical-fixes
```

### Phase 1 Tamamlama

```bash
# Phase 1 tamamlandı, develop'e merge et
git checkout develop
git merge feature/phase-1-critical-fixes

# Conflict varsa çöz, sonra:
git push origin develop

# Feature branch'i temizle (opsiyonel)
git branch -d feature/phase-1-critical-fixes
git push origin --delete feature/phase-1-critical-fixes
```

---

## 📝 Commit Message Formatı

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Yeni özellik
- `fix`: Bug fix
- `docs`: Dokümantasyon
- `style`: Formatting, CSS
- `refactor`: Code refactoring
- `perf`: Performance iyileştirme
- `test`: Test ekleme
- `chore`: Build, dependencies

### Örnekler

```bash
# Feature ekleme
git commit -m "feat(cart): add shopping cart functionality

- Create cart store with Zustand
- Add add/remove/update quantity actions
- Implement localStorage persistence
- Add cart badge to navbar

Implements: RFC-004"

# Bug fix
git commit -m "fix(navbar): resolve mobile menu overflow

- Fix hamburger menu positioning
- Adjust z-index for proper layering

Fixes: #12"

# Refactoring
git commit -m "refactor(components): extract product card to separate component

- Create ProductCard component
- Update home page to use ProductCard
- Add props interface

Improves code reusability"

# Documentation
git commit -m "docs: add implementation guide for phase 2

- Create detailed step-by-step guide
- Add troubleshooting section

Related: RFC-003, RFC-004"
```

---

## 🏷️ Tagging (Versiyonlama)

### Semantic Versioning

```
MAJOR.MINOR.PATCH

1.0.0 -> First production release
1.1.0 -> New feature (backward compatible)
1.1.1 -> Bug fix (backward compatible)
2.0.0 -> Breaking change
```

### Phase Tamamlama Tag'leri

```bash
# Phase 1 tamamlandı
git checkout develop
git tag -a v0.1.0 -m "Phase 1: Critical Fixes Complete

- Tailwind configuration
- Error handling
- Loading states"
git push origin v0.1.0

# Phase 2 tamamlandı
git tag -a v0.2.0 -m "Phase 2: State Management Complete

- Zustand setup
- Shopping cart
- LocalStorage persistence"
git push origin v0.2.0

# Production release
git checkout main
git merge develop
git tag -a v1.0.0 -m "Production Release v1.0.0

Complete e-commerce platform with:
- Shopping cart
- Categories and filtering
- Search
- SEO optimization
- Responsive design"
git push origin v1.0.0
```

---

## 🔍 Useful Git Commands

### Status ve History

```bash
# Değişiklikleri gör
git status

# Commit history
git log --oneline --graph --decorate --all

# Son 5 commit
git log -5 --oneline

# Belirli bir dosyanın history
git log --oneline src/app/page.js

# Değişiklikleri göster
git diff
git diff --staged
```

### Undo İşlemleri

```bash
# Son commit'i geri al (değişiklikleri koru)
git reset --soft HEAD~1

# Son commit'i geri al (değişiklikleri sil)
git reset --hard HEAD~1

# Belirli bir dosyayı unstage et
git restore --staged src/app/page.js

# Dosyadaki değişiklikleri geri al
git restore src/app/page.js

# Son commit'i düzelt
git commit --amend
```

### Branch Yönetimi

```bash
# Tüm branch'leri listele
git branch -a

# Branch oluştur ve geç
git checkout -b feature/new-feature

# Branch'i remote'a push et
git push -u origin feature/new-feature

# Remote branch'i sil
git push origin --delete feature/old-feature

# Local branch'i sil
git branch -d feature/old-feature
```

### Stash (Geçici Saklama)

```bash
# Değişiklikleri sakla
git stash

# Saklanmış değişiklikleri listele
git stash list

# Son stash'i uygula
git stash pop

# Belirli stash'i uygula
git stash apply stash@{0}

# Stash'i sil
git stash drop stash@{0}
```

---

## 🔄 Pull Request Workflow

### 1. Feature Branch'ten PR Aç

```bash
# GitHub'da Pull Request oluştur
# Base: develop
# Compare: feature/phase-1-critical-fixes

# PR Template
Title: [Phase 1] Critical Fixes - Tailwind and Error Handling

Description:
## What
Implements RFC-001 and RFC-002

## Changes
- ✅ Tailwind configuration fixed
- ✅ HeroUI provider added
- ✅ Error handling with useFetch hook
- ✅ Loading states with skeleton

## Testing
- [x] Tailwind classes work
- [x] Loading spinner shows
- [x] Error messages display
- [x] Retry functionality works

## Screenshots
[Add screenshots]

Closes #1, Closes #2
```

### 2. Code Review

```bash
# Review sonrası değişiklik gerekirse
git checkout feature/phase-1-critical-fixes

# Değişiklikleri yap
git add .
git commit -m "fix: address review comments"
git push origin feature/phase-1-critical-fixes

# PR otomatik güncellenir
```

### 3. Merge

```bash
# PR onaylandı ve merge edildi
# Local'de güncelle
git checkout develop
git pull origin develop

# Feature branch'i temizle
git branch -d feature/phase-1-critical-fixes
```

---

## 🎯 Phase Checklist

Her phase sonunda:

```bash
# ✅ Tüm dosyalar commit edildi mi?
git status

# ✅ Test edildi mi?
npm run dev
npm run build

# ✅ Branch güncel mi?
git pull origin develop

# ✅ Merge conflict yok mu?
git merge develop

# ✅ Tag eklendi mi?
git tag -a v0.X.0 -m "Phase X Complete"

# ✅ Push edildi mi?
git push origin feature/phase-X
git push origin --tags
```

---

## 🚨 Sorun Çözme

### Merge Conflict

```bash
# Conflict oluştu
git merge develop

# Conflicted dosyaları gör
git status

# Dosyayı düzenle, conflict markers'ı temizle
# <<<<<<<
# =======
# >>>>>>>

# Resolve et
git add conflicted-file.js
git commit -m "chore: resolve merge conflicts"
```

### Yanlış Branch'e Commit

```bash
# Son commit'i başka branch'e taşı
git log  # commit hash'i kopyala
git checkout correct-branch
git cherry-pick <commit-hash>

# Yanlış branch'teki commit'i sil
git checkout wrong-branch
git reset --hard HEAD~1
```

### Committed File'ı .gitignore'a Ekle

```bash
# .gitignore'a ekle
echo "node_modules/" >> .gitignore

# Git'ten çıkar (dosya kalır)
git rm -r --cached node_modules/

# Commit
git commit -m "chore: remove node_modules from git"
```

---

## 📚 Kaynaklar

- [Git Official Docs](https://git-scm.com/doc)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

---

## 🎉 Best Practices

1. **Sık Commit**: Küçük, anlamlı commit'ler
2. **Descriptive Messages**: Ne yaptığını açıkla
3. **Test Before Commit**: Her commit çalışır durumda olmalı
4. **Pull Often**: Sık sık `git pull` yap
5. **Branch Per Feature**: Her feature için ayrı branch
6. **Delete Merged Branches**: Merge edilen branch'leri temizle
7. **Use .gitignore**: node_modules, .env gibi dosyaları ignore et
8. **Sign Commits**: GPG signature ekle (opsiyonel)

İyi commit'ler! 🚀
