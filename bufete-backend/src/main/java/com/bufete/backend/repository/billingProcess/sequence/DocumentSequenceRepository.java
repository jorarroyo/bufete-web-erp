package com.bufete.backend.repository.billingProcess.sequence;

import com.bufete.backend.model.billingProcess.sequence.DocumentSequence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentSequenceRepository extends JpaRepository<DocumentSequence, Long> {
}
