package com.bufete.backend.repository.recordFiles;

import com.bufete.backend.model.recordFiles.MergeRecordFileHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordFileMergeHistRepository extends JpaRepository<MergeRecordFileHistory, Long> {
}
